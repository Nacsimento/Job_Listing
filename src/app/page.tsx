'use client'
import Image from "next/image";
import { useData } from "./hooks/useData";
import { useState, useEffect } from "react";

export default function Home() {

  const OriginalData = useData();

  const [allData, setAllData] = useState<typeof OriginalData>(OriginalData)
  const [filterData, setFilterData] = useState<typeof OriginalData>(OriginalData)
  const [filterArr, setFilterArr] = useState<string[]>([])


  function filterItem(item: string) {
    if (!filterArr.includes(item)) {
      const updated = [...filterArr, item];
      setFilterArr(updated);
    }
  }


  function clearFilter(index: number) {
    const updated = filterArr.filter((_, i) => i !== index);
    setFilterArr(updated);
  }

  function restFilter() {
    setFilterArr([])

  }


  useEffect(() => {
    if (filterArr.length === 0) {
      setFilterData(allData);
      setAllData(allData)
    } else {
      const filtered = allData.filter((item) => {
        const allTags = [item.role, item.level, ...item.languages, ...item.tools];
        return filterArr.every((f) => allTags.includes(f));
      });
      setFilterData(filtered);
    }
  }, [filterArr, allData]);



  return (
    <>
      <header className="bg-Dark-Cyan relative">
        <picture>
          <source srcSet="/bg-header-mobile.svg" media="(max-width: 1023px)" type="image/webp" />
          <source srcSet="/bg-header-desktop.svg"  media="(max-width: 1023px)" type="image/jpeg" />
          <Image
            src={'/bg-header-desktop.svg'}
            height={100}
            width={100}
            alt="header-desktop"
            className="w-full"
          />
        </picture>


      </header>
      {
        filterArr.length !== 0 ?
          <div className="relative top-[-58px] flex justify-between  items-center shadow-xl  mx-[120px]  px-6 py-9 bg-white rounded max-md:mx-[18px] max-md:gap-[42px] }">
            <div className="flex gap-5 max-md:flex-wrap">
              {filterArr.map((pill, id) => {
                return (
                  <div key={id} className="flex items-center gap-2  pl-2   bg-Light-Grayish-Cyan text-Dark-Cyan font-bold text-[13px]">
                    <div>{pill}</div>
                    <div onClick={() => clearFilter(id)} className="hover:bg-black transition ease-in duration-300 cursor-pointer bg-Dark-Cyan p-2">
                      <Image
                        src={'/icon-remove.svg'}
                        height={18}
                        width={18}
                        alt="close"
                      />
                    </div>

                  </div>
                )
              })}

            </div>
            <div onClick={restFilter} className="text-Dark-Grayish-Cyan font-semibold cursor-pointer hover:underline hover:text-Dark-Cyan transition  ease-in duration-100">
              Clear
            </div>
          </div>

          :
          ''

      }

      <section className={`${filterArr.length === 0 ? 'mt-14' : 'mt-0'} flex flex-col gap-4  max-md:gap-8`}>
        {
          filterData.map((item) => {
            return (
              <div key={item.id} className={` flex justify-between items-center shadow-xl  mx-[120px] my-2 px-6 py-9 bg-white rounded ${item.featured ? 'border-l-4 border-l-Dark-Cyan' : ''} max-md:flex-col  max-md:mx-[18px] max-md:items-start`}>
                <div className="flex gap-4 relative">
                  <div className="max-md:absolute top-[-59px]">
                    <Image
                      src={item.logo}
                      height={75}
                      width={75}
                      alt={item.company}
                      className="max-md:w-12"
                    />
                  </div>
                  <div className="flex flex-col justify-between items-start max-md:gap-3">
                    <div className="flex gap-3 items-center ">
                      <h1 className="text-Dark-Cyan font-Spartan font-bold">{item.company}</h1>
                      <p className={`${item.new ? 'flex items-center justify-center font-Spartan font-bold text-white text-[12px] px-1.5 py-0.5 bg-Dark-Cyan rounded-full' : ''}`}>{item.new ? 'NEW' : ''}</p>
                      <p className={`${item.featured ? 'flex items-center justify-center font-Spartan font-bold text-white text-[12px] px-1.5 py-0.5 bg-black rounded-full' : ''}`}>{item.featured ? 'FEATURED' : ''}</p>
                    </div>
                    <h1 className="font-Spartan font-bold cursor-pointer hover:text-Dark-Cyan transition  ease-in duration-300 ">{item.position}</h1>
                    <div className="flex gap-3 font-Spartan">
                      <div className="text-Dark-Grayish-Cyan font-semibold text-[13px]">{item.postedAt}</div>
                      <div className="text-Dark-Grayish-Cyan">•</div>
                      <div className="text-Dark-Grayish-Cyan font-semibold text-[13px]">{item.contract}</div>
                      <div className="text-Dark-Grayish-Cyan">•</div>
                      <div className="text-Dark-Grayish-Cyan font-semibold text-[13px]">{item.location}</div>
                    </div>
                  </div>
                </div>
                <hr  className="hidden max-md:block border-0.5 border-Dark-Grayish-Cyan w-full relative top-[18px]"/>
                <div className="flex gap-4 max-md:flex-wrap max-md:pt-[36px] ">
                  <div onClick={() => filterItem(item.role)} className="px-2 py-1 bg-Light-Grayish-Cyan text-Dark-Cyan font-bold text-[13px] cursor-pointer hover:bg-Dark-Cyan hover:text-white transition  ease-in duration-300">{item.role}</div>
                  <div onClick={() => filterItem(item.level)} className="px-2 py-1 bg-Light-Grayish-Cyan text-Dark-Cyan font-bold text-[13px] cursor-pointer hover:bg-Dark-Cyan hover:text-white transition  ease-in duration-300">{item.level}</div>
                  <div className="flex gap-4">{item.languages.map((lang, index) => { return (<div onClick={() => filterItem(lang)} className="px-2 py-1 bg-Light-Grayish-Cyan text-Dark-Cyan font-bold text-[13px] cursor-pointer hover:bg-Dark-Cyan hover:text-white transition  ease-in duration-300 max-md:flex-wrap" key={index}>{lang}</div>) })}</div>
                  {item.tools.map((tool, index) => { if (item.tools.length !== 0) { return (<div onClick={() => filterItem(tool)} className="px-2 py-1 bg-Light-Grayish-Cyan text-Dark-Cyan font-bold text-[13px] cursor-pointer hover:bg-Dark-Cyan hover:text-white transition  ease-in duration-300 max-md:flex-wrap" key={index}>{tool}</div>) } })}
                </div>

              </div>
            )
          })
        }
      </section>

    </>
  );
}
