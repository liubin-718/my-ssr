import Link from 'next/link'
import Header from '../components/Header';
import Layout from '../components/MyLayout';

const PostLink = (props) => (
    <li>
        <Link href={`/post?title=${props.title}`}>
            <a href="">
                {props.title}
            </a>
        </Link>
    </li>
)

export default () => (
    <Layout>
        <h2>我的博客</h2>
        <ul>
            <PostLink title="Hello Next.js"></PostLink>
            <PostLink title="Learn Next.js is awesome"></PostLink>
            <PostLink title="Deploy apps with Ziet"></PostLink>
        </ul>
    </Layout>
)
// export default () => (
//     <div>
//         <Header />
//         <p>Hello Next.js</p>
//     </div>
// )
