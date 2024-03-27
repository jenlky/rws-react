'use client';
import { Package } from "@/app/model/npm-registry";
import axios from "axios";
import { useEffect, useState } from "react";
import '../../style.css';

export default function PackagePage({ params }: { params: { slug: string[] } }) {
  const [data, setData] = useState<Package>()

  async function fetchPackageDetails() {
    let slug = ''
    if (params.slug.length > 1) {
      slug = params.slug.join("/")
    } else {
      slug = params.slug[0]
    }
    const res = await axios.get(`https://registry.npmjs.org/${slug}`)
    return res
  }

  useEffect(() => {
    fetchPackageDetails().then(json => {
      setData(json.data)
    })
  }, [data?.name])

  return (
    <main className="package-main">
      <a href={data?.homepage} className="package-name">{data?.name || 'NIL'}</a>
      <div>
        <div>
          <span className="bold">Author: </span>
          {data?.author?.name || 'NIL'}
        </div>
        <div>
          <span className="bold">Description: </span>
          {data?.description || 'NIL'}
        </div>
        <div>
          <span className="bold">Keywords: </span>
          {data?.keywords?.join(', ') || 'NIL'}
        </div>
        <div>
          <span className="bold">Repository URL: </span>
          {data?.repository?.url || 'NIL'}    
        </div>
      </div>
    </main>
  )
}
