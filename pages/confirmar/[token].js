import clienteAxios from "../../config/axios";
import Layout from "../../components/Layout";
import Link from "next/link";

export async function getServerSideProps({ params }) {

  const { token } = params;

  let resultado;

  try {
    resultado = await clienteAxios.get(`/api/usuarios/confirmar/${token}`); 
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
          data: resultado.data
      }
  }
}

const ConfirmarCuenta = ({ data }) => {

  const { msg } = data;

  return (
    <Layout
      pagina='Confirmar Cuenta'
    >
      <div className="mx-auto my-20 md:my-32 lg:my-44 shadow-lg px-5 py-10 rounded-xl bg-white w-10/12 sm:w-3/5">
        <h1 className="mx-auto text-center text-sky-600 font-bold text-2xl">
          {msg}. Ahora puedes {''}
          <Link
            href="/login"
            className="font-bold text-red-500 hover:text-red-700 cursor-pointer"
          >Iniciar Sesión</Link>
        </h1>
      </div>
    </Layout>
  )
}

export default ConfirmarCuenta
