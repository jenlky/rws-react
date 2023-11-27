'use client';

export default function Package({ params }: { params: { slug: string } }) {
  return (
    <main>
      Package: {params.slug}
    </main>
  )
}
