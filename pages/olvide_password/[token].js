import clienteAxios from "../../config/axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout"
import authContext from "../../context/auth/authContext";
import * as Yup from 'yup';
import Alerta from "../../components/Alerta";
import Link from "next/link";

export async function getServerSideProps({ params }) {

    const { token } = params;
  
    let resultado;
  
    try {
      resultado = await clienteAxios.get(`/api/usuarios/olvide-password/${token}`); 
    } catch (error) {
      resultado = error.response;
    }
  
    if(!resultado.data.msg) {
      return {
          notFound: true,
      };
    }
  
    return {
        props: {
          token: token
        }
    }
  }

const Nuevopassword = ({ token }) => {

  const AuthContext = useContext(authContext);
  const { mensaje, cambiarCotraseña, autenticado } = AuthContext;

  const router = useRouter();

  const [passwordModificado, setPasswordModificado] = useState(false);
  
  useEffect(() => {
    if(autenticado) {
      router.push('/');
    }
  }, [autenticado]);

  // Formulario y validación con Formik y Yup
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmarpassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("El Password es obligatorio")
        .matches(/^(?=.*[A-Z]).*$/, 'Debe contener al menos una letra mayúscula')
        .min(9, "Debe contener al menos 9 caracteres")
        .matches(/^(.*[!@#$%^&*_¡?-]){2,}.*$/, 'Debe contener al menos dos caracteres especiales (!@#$%^&*_¡?-)'),
      confirmarpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required("Confirmar el Password es obligatorio"),
    }),
    onSubmit: async (valores, { resetForm }) => {
      await cambiarCotraseña(valores.password, token);
      
      resetForm();

      setPasswordModificado(true);
    }
  });

  return (
    <Layout
      pagina='Cambiar Password'
    >
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800
          text-center my-4">Cambiar Password</h2>
          
        { mensaje && <Alerta /> }

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}  
            >
              <div className="mb-4">
                <label htmlFor="password"
                  className="block text-black text-sm font-bold mb-2"
                >Nuevo Password</label>

                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full
                      py-2 px-3 text-gray-700 leading-tight
                      focus:outline-none focus:shadow-blue-900"
                  placeholder="Password del usuario"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={passwordModificado}
                />

                { formik.touched.password && formik.errors.password && (
                  <div className="my-2 bg-gray-200 border-l-4
                    border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password"
                  className="block text-black text-sm font-bold mb-2"
                >Confirmar Password</label>

                <input
                  type="password"
                  id="confirmarpassword"
                  className="shadow appearance-none border rounded w-full
                      py-2 px-3 text-gray-700 leading-tight
                      focus:outline-none focus:shadow-blue-900"
                  placeholder="Password del usuario"
                  value={formik.values.confirmarpassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={passwordModificado}
                />

                { formik.touched.confirmarpassword && formik.errors.confirmarpassword && (
                  <div className="my-2 bg-gray-200 border-l-4
                    border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.confirmarpassword}</p>
                  </div>
                )}
              </div>

              <input
                type="submit"
                className={`${!passwordModificado ? "bg-red-600 hover:bg-gray-900 cursor-pointer" : "bg-red-500"} w-full p-2 text-white uppercase font-bold`}
                value="Guardar Nuevo Password"
                disabled={passwordModificado}
              />
            </form>

            {passwordModificado && (
                <Link
                className="block text-center my-5 text-slate-500 hover:text-slate-700 uppercase text-lg"
                href="/login"
            >Inicia Sesión</Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Nuevopassword