import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Image from 'next/legacy/image';

const pages = [
  {
    image: '/img/instrucciones/1.png',
    posicion: 'izquierda',
    content: 'Para cargar un archivo y generar tu enlace de descarga, puedes seleccionarlo o arrastrarlo en el dropzone en la pestaña de inicio. Puedes cargar archivos sin registrarte, pero tu limite será de 1MB. Si quieres cargar archivos más pesados puedes registrarte usando tu correo electrónico. Los usuarios registrados además pueden escoger el número de descargas y ponerle una contraseña a su enlace de descarga.',
  },
  {
    image: '/img/instrucciones/2.png',
    posicion: 'derecha',
    content: 'Otra ventaja de estar registrado es que puedes acceder a tu historial de descarga para consultar y editar tus enlaces. En la pestaña Mis Archivos puedes encontrar la lista de todos los enlaces que has generado. En la parte superior derecha encontraras una pestaña donde puedes seleccionar por el tipo de enlace. Puedes seleccionar ver todos los enlaces, ver solo los enlaces activos, que son los enlaces que todavía tienen descargas disponibles, o ver solo los enlaces completados o sin descargas disponibles.',
  },
  {
    image: '/img/instrucciones/3.png',
    posicion: 'izquierda',
    content: 'En tu historial tienes tres opciones: editar, detalles y eliminar. Si le das clic al botón de detalles en uno de los enlaces, puedes acceder a su historial de descargas donde veras cuantas personas han descargado tu archivo y tendrás una lista de los usuarios registrados que lo hayan hecho.',
  },
  {
    image: '/img/instrucciones/4.png',
    posicion: 'derecha',
    content: 'También puedes editar el número de descargas o eliminar tus enlaces. Si quieres editar un enlace, ten en cuenta que solo puedes seleccionar un máximo de 50 descargas. Y si vas a eliminarlo, recuerda que una vez que lo hagas no podrás volver a recuperar tu archivo. ',
  }
];

const Instrucciones = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const handleNext = () => {
    setPageIndex((prev) => Math.min(prev + 1, pages.length - 1));
  };

  const handlePrev = () => {
    setPageIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Layout pagina='Instrucciones'>
      <main className='contenedor overflow-x-hidden'>
        <div className='sm:flex sm:justify-between mb-20 align-middle'>
          <img
            src={pageIndex !== 0 ? "/iconos/next-svgrepo-com.svg" : "/iconos/next-right-arrow-svgrepo-com.svg"} alt="previous"
            className={`sm:block hidden w-16 h-16 mirror-effect mt-2 ${pageIndex !== 0 && "cursor-pointer"}`}
            onClick={handlePrev} disabled={pageIndex === 0}
          />
          <h2 className='heading text-shadow'>Instrucciones</h2>
          <img
            src={pageIndex !== pages.length - 1 ? "/iconos/next-svgrepo-com.svg" : "/iconos/next-right-arrow-svgrepo-com.svg"} alt="next"
            className={`sm:block hidden w-16 h-16 mt-2 ${pageIndex !== pages.length - 1 && "cursor-pointer"}`}
            onClick={handleNext} disabled={pageIndex === pages.length - 1}
          />

          <div className='sm:hidden flex justify-center space-x-10'>
            <img
              src={pageIndex !== 0 ? "/iconos/next-svgrepo-com.svg" : "/iconos/next-right-arrow-svgrepo-com.svg"} alt="previous"
              className={`w-16 h-16 mirror-effect mt-2 ${pageIndex !== 0 && "cursor-pointer"}`}
              onClick={handlePrev} disabled={pageIndex === 0}
            />
            <img
              src={pageIndex !== pages.length - 1 ? "/iconos/next-svgrepo-com.svg" : "/iconos/next-right-arrow-svgrepo-com.svg"} alt="next"
              className={`w-16 h-16 mt-2 ${pageIndex !== pages.length - 1 && "cursor-pointer"}`}
              onClick={handleNext} disabled={pageIndex === pages.length - 1}
            />
          </div>
        </div>

        <motion.div
          key={pageIndex}
          initial={{ opacity: 0, x: pageIndex === 0 ? '-100%' : '100%' }}
          animate={{ opacity: 1, x: '0%' }}
          exit={{ opacity: 0, x: pageIndex === 0 ? '100%' : '-100%' }}
          transition={{ type: 'keyframes', duration: 1 }}
          style={{ width: '100%', flexShrink: 0 }}
        >
          <div className='grid gap-16 md:grid-cols-2 items-center'>
            {pages[pageIndex].posicion === 'izquierda' && (
              <Image
                layout='responsive'
                width={600}
                height={450}
                src={pages[pageIndex].image}
                alt={`Imagen ${pageIndex + 1}`}
              />
            )}
            <div className='flex justify-center'>
              <p className='text-xl sm:text-2xl w-11/12 text-justify'>{pages[pageIndex].content}</p>
            </div>
            {pages[pageIndex].posicion === 'derecha' && (
              <Image
                layout='responsive'
                width={600}
                height={450}
                src={pages[pageIndex].image}
                alt={`Imagen ${pageIndex + 1}`}
              />
            )}
          </div>
        </motion.div>
      </main>
    </Layout>
  );
};

export default Instrucciones;

