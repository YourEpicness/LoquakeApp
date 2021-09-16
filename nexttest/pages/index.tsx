import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { GetServerSideProps } from 'next'

// used to label the data from the http req
import { InferGetServerSidePropsType } from 'next'

// actual ts label for the data
// type Data = {}

const Home: NextPage = ({data}) => {
  console.log(data);

  return (
    <div className="">
      <div className="flex p-6 items-center shadow-md bg-red text-xl font-medium justify-center flex-col">
        <h1 className=""> Hi! Welcome to Tailwind, TS, Next Stack! </h1>

        <p className=""> This is a cool test!</p>

        <p className="">Never would've guessed but wow!</p>

        <p className=""> data is: {data}</p>
      </div>

    </div>
  )
}

// Get Static Props is for initial loading of site
// export const getStaticProps: GetStaticProps = async (context) => {

// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = 'test';
  // always gotta return the data we get as props from the http request
  return {
    props: {
      data,
    }
  }
}

// function Page({data}): InferGetServerSidePropsType<typeof getServerSideProps) {
//   // will resolve posts to type data
// }

export default Home
