import { useEffect, useMemo, useState } from "react";
import { fetchProducts, fetchCategories } from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";

export default function Home(){
  const [all, setAll] = useState([]);
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const PER = 8;

  useEffect(()=>{ fetchProducts().then(setAll).catch(()=>{}); fetchCategories().then(setCats).catch(()=>{}); },[]);

  const filtered = useMemo(()=>{
    let arr = [...all];
    if(category) arr = arr.filter(p=>p.category === category);
    if(search) arr = arr.filter(p=> p.title.toLowerCase().includes(search.toLowerCase()));
    if(sort === "price-asc") arr.sort((a,b)=>a.price-b.price);
    if(sort === "price-desc") arr.sort((a,b)=>b.price-a.price);
    return arr;
  },[all, category, search, sort]);

  const totalPages = Math.ceil(filtered.length / PER);
  const pageItems = filtered.slice((page-1)*PER, page*PER);

  useEffect(()=> setPage(1), [search, category, sort]);

  return (
    <>
      <Filters
        categories={cats}
        selectedCategory={category}
        onCategory={setCategory}
        search={search}
        onSearch={setSearch}
        sort={sort}
        onSort={setSort}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pageItems.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </>
  );
}
