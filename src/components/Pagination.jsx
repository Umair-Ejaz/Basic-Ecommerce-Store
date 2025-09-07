export default function Pagination({ page, totalPages, onPage }) {
  const arr = Array.from({length: totalPages}, (_,i)=>i+1);
  if(totalPages<=1) return null;
  return (
    <div className="flex space-x-2 justify-center mt-6">
      <button onClick={()=>onPage(Math.max(1,page-1))} className="px-3 py-1 border rounded">Prev</button>
      {arr.map(p=>(
        <button key={p} onClick={()=>onPage(p)} className={`px-3 py-1 border rounded ${p===page?'bg-blue-600 text-white':''}`}>{p}</button>
      ))}
      <button onClick={()=>onPage(Math.min(totalPages,page+1))} className="px-3 py-1 border rounded">Next</button>
    </div>
  );
}
