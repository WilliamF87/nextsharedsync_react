import { useFormik } from "formik";
import { useContext } from "react";
import Layout from "../components/Layout"
import authContext from "../context/auth/authContext";
import * as Yup from "yup";
import Alerta from "../components/Alerta";

const CrearCuenta = () => {

  const AuthContext = useContext(authContext);
  const { registrarUsuario, mensaje } = AuthContext;

  // Formulario y validación con Formik y Yup
  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      password: '',
      confirmarpassword: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required("El Nombre es obligatorio"),
      email: Yup.string()
        .email("El email no es válido")
        .required("El Email es obligatorio"),
      password: Yup.string()
        .required("El Password es obligatorio")
        .min(9, "Debe contener al menos 9 caracteres")
        .matches(/^(?=.*[A-Z]).*$/, 'Debe contener al menos una letra mayúscula')
        .matches(/^(.*[!@#$%^&*_¡?-]){2,}.*$/, 'Debe contener al menos dos caracteres especiales (!@#$%^&*_¡?-)'),
      confirmarpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required("Confirmar el Password es obligatorio"),
    }),
    onSubmit: async (valores, { resetForm }) => {
      await registrarUsuario(valores);

      resetForm();
    }
  });

  return (
    <Layout
      pagina='Crear Cuenta'
    >
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800
          text-center my-4">Crear Cuenta</h2>
        
        { mensaje && <Alerta />}

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label htmlFor="nombre"
                  className="block text-black text-sm font-bold mb-2"
                >Nombre</label>

                <input
                  type="text"
                  id="nombre"
                  className="shadow appearance-none border rounded w-full
                      py-2 px-3 text-gray-700 leading-tight
                      focus:outline-none focus:shadow-blue-900"
                  placeholder="Nombre de usuario"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                
                { formik.touched.nombre && formik.errors.nombre && (
                  <div className="my-2 bg-gray-200 border-l-4
                    border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.nombre}</p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email"
                  className="block text-black text-sm font-bold mb-2"
                >Email</label>

                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full
                      py-2 px-3 text-gray-700 leading-tight
                      focus:outline-none focus:shadow-blue-900"
                  placeholder="Email del usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                { formik.touched.email && formik.errors.email && (
                  <div className="my-2 bg-gray-200 border-l-4
                      border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password"
                  className="block text-black text-sm font-bold mb-2"
                >Password</label>

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
                className="bg-red-600 hover:bg-gray-900 w-full p-2
                    text-white uppercase font-bold cursor-pointer"
                value="Crear Cuenta"
              />
            </form>
          </div>
        </div> 
      </div>
    </Layout>
  )
}

export default CrearCuenta