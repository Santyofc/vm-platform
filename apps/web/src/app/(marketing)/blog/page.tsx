import React from "react";
import { Terminal, Newspaper, Search, Filter, Rss, ArrowRight } from "lucide-react";
import { GlitchText } from "@/components/ui/GlitchText.client";
import { getAllPosts } from "@/utils/markdown";
import Link from "next/link";
import SingleBlog from "@/components/Blog/SingleBlog";

export const metadata = {
    title: "Blog | Zona Sur Tech",
    description: "Insights técnicos, actualizaciones de infraestructura y el futuro del software industrial.",
};

export default function BlogPage() {
    // Fetch real posts from markdown directory
    const allPosts = getAllPosts([
        "title",
        "date",
        "slug",
        "metadata",
        "excerpt",
    ]);

    // Format posts for the UI
    const posts = allPosts.map(post => ({
        id: post.slug,
        title: post.title,
        excerpt: post.excerpt || "Sin descripción disponible.",
        coverImage: post.metadata?.coverImage || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3",
        date: post.date || "2026-03-01",
        slug: post.slug
    }));

    // Fallback if no posts exist
    if (posts.length === 0) {
        posts.push({
            id: "default",
            title: "Nucleus Protocol Sync",
            excerpt: "Sincronizando el primer post del kernel... Vuelve pronto para actualizaciones críticas.",
            coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3",
            date: "2026-03-09",
            slug: "nucleus-protocol"
        });
    }

    return (
        <main className="min-h-screen bg-zs-bg-primary pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-zs-blue/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-zs-violet/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto relative z-10">
                <div className="max-w-4xl mb-16">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zs-blue/10 border border-zs-blue/20 text-zs-blue mb-8">
                        <Newspaper className="w-4 h-4 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Noticias del Kernel</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.8] mb-8">
                        Uplink <br />
                        <GlitchText 
                            text="Informativo" 
                            className="text-transparent bg-clip-text bg-gradient-to-r from-zs-cyan via-zs-blue to-zs-violet drop-shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                        />
                    </h1>

                    <p className="text-xl text-zs-text-secondary font-light max-w-2xl leading-relaxed">
                        Crónicas de ingeniería, actualizaciones de la red y visión estratégica sobre el ecosistema industrial de Zona Sur Tech.
                    </p>
                </div>

                {/* Filter / Search Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-4 rounded-2xl bg-zs-bg-secondary/40 border border-zs-border">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zs-text-muted group-hover:text-zs-blue transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Buscar en el archivo técnico..." 
                            className="w-full bg-zs-bg-primary border border-zs-border rounded-xl py-3 pl-12 pr-4 text-xs font-bold text-white placeholder:text-zs-text-muted outline-none focus:border-zs-blue/50 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        {["Todos", "Ingeniería", "Seguridad", "Update"].map(cat => (
                            <button key={cat} className="px-5 py-2 rounded-lg bg-zs-bg-primary border border-zs-border text-[10px] font-black text-zs-text-secondary uppercase tracking-widest hover:text-white hover:border-zs-blue/30 transition-all whitespace-nowrap">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="zs-card group hover:border-zs-blue/20 transition-all overflow-hidden bg-zs-bg-secondary/20">
                            <div className="aspect-[16/9] overflow-hidden relative">
                                <img 
                                    src={post.coverImage} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zs-bg-primary via-transparent to-transparent opacity-60" />
                            </div>
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black text-zs-blue uppercase tracking-widest">{post.date}</span>
                                    <span className="text-[10px] font-black text-zs-text-muted uppercase tracking-widest">v4.0.x</span>
                                </div>
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4 group-hover:text-zs-blue transition-colors leading-tight">{post.title}</h3>
                                <p className="text-sm text-zs-text-secondary leading-relaxed mb-8 line-clamp-2">{post.excerpt}</p>
                                <div className="flex items-center justify-between border-t border-zs-border/50 pt-6">
                                    <Link href={`/blog/${post.slug}`} className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 hover:text-zs-blue transition-colors">
                                        Leer Detalle <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <div className="flex items-center gap-2 text-zs-text-muted italic text-[10px]">
                                        <Rss className="w-3 h-3" /> ZST_UPLINK
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="zs-btn-brand bg-zs-bg-secondary border border-zs-border text-white shadow-none px-12 py-5 text-sm font-black uppercase tracking-widest hover:border-zs-blue/30">
                        Cargar más Entradas
                    </button>
                </div>
            </div>
        </main>
    );
}
