import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

export const Layout: FC<LayoutProps> = ({children, title}) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Hector Aramboles" />
                <meta name="description" content={`Informacion del pokemon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />

                <meta property="og:title" content={`Informacion sobre el pokemon ${title}`} />
                <meta property="og:description" content={`Pagina del pokemon ${title}`} />
            </Head>

            <Navbar />

            <main style={{
                padding: '0px 20px',
            }}>
                {children}
            </main>
        </>
    );
};