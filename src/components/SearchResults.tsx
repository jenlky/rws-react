import { formatDate } from '@/app/helper';
import { NpmObject } from '@/app/model/npm-registry';
import Link from 'next/link';

export default function SearchResults({ data } : { data: NpmObject[] }) {
  return data.map(pkg => {
    return (
      <Link href={`package/${pkg.package?.name}`} key={pkg.package?.name}>
        <div className='search-result-row'>
          <div className='search-result-row-content'>
            <div>
              <div>
                <span className='bold'>Package: </span>
                <span>{pkg.package?.name}</span>
              </div>
              <div>
                <span className='bold'>Author: </span>
                <span className='italic'>{pkg.package.author?.name}</span>            
              </div>
            </div>
            <div>
              <div className='updated-date'>Updated date</div>
              <div className='italic'>{formatDate(pkg.package?.date)}</div>
            </div>
          </div>
        </div>
      </Link>
    )
  })
}