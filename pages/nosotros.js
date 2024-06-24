import Layout from '../components/Layout'
import Image from 'next/image'
// import Image from 'next/image';

const Nosotros = () => {
  return (
    <Layout
        pagina='Nosotros'
    >
        <main className='contenedor'>
          <h2 className='heading text-shadow mb-20'>Nosotros</h2>

          <div className='grid gap-16 md:grid-cols-2 items-center'>
            <Image layout="responsive" width={600} height={450} src="/img/nosotros.jpg" alt="Imagen sobre nosotros" />
            {/* <Image width={600} height={450} src="/img/nosotros.jpg" alt="Imagen sobre nosotros" /> */}

            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hendrerit sagittis dolor tincidunt sodales. Sed nec magna mi. Cras volutpat neque in enim auctor rutrum. Ut eu turpis convallis, ullamcorper velit vel, sagittis sem. Phasellus odio quam, ultricies quis molestie eu, mollis non sapien. Aliquam eu risus convallis, varius eros id, blandit purus. Nullam imperdiet vehicula felis, sed commodo ipsum placerat in. Nunc sit amet volutpat tellus, non blandit nibh.</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hendrerit sagittis dolor tincidunt sodales. Sed nec magna mi. Cras volutpat neque in enim auctor rutrum. Ut eu turpis convallis, ullamcorper velit vel, sagittis sem. Phasellus odio quam, ultricies quis molestie eu, mollis non sapien. Aliquam eu risus convallis, varius eros id, blandit purus. Nullam imperdiet vehicula felis, sed commodo ipsum placerat in. Nunc sit amet volutpat tellus, non blandit nibh.</p>
            </div>
          </div>
        </main>
    </Layout>
  )
}

export default Nosotros