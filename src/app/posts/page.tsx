"use client";

import Header from "../../components/Header";
import { useLanguage } from "../../components/LanguageProvider";
import LinkedinPosts from "../../components/LinkedinPosts";

export default function PostsPage() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <>
      <Header />

      <main className="posts-page" id="inicio">
        <section className="posts posts-page-section" aria-labelledby="posts-page-title">
          <div className="container">
            <div className="section-head posts-head">
              <p className="section-kicker">
                <span>{isEnglish ? "Posts" : "Posts"}</span> LinkedIn
              </p>
              <h1 id="posts-page-title" className="posts-page-title">
                {isEnglish ? "What I build," : "O que eu construo,"}
                <br />
                <span className="grad-text">{isEnglish ? "I share here." : "compartilho por aqui."}</span>
              </h1>
            </div>

            <LinkedinPosts />
          </div>
        </section>
      </main>
    </>
  );
}
