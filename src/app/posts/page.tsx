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
            <div className="section-head">
              <h1 id="posts-page-title" className="posts-page-title">
                Posts
              </h1>
              <div className="section-meta">{isEnglish ? "Selected LinkedIn posts" : "Publicações selecionadas do LinkedIn"}</div>
            </div>

            <LinkedinPosts />
          </div>
        </section>
      </main>
    </>
  );
}
