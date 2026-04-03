const InventoryList = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="p-4 border-b flex justify-between items-center">
        <input 
          type="text" 
          placeholder="Search SKU or Name..." 
          className="border rounded-lg px-4 py-2 w-1/3 outline-none focus:ring-2 ring-indigo-200"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium">Add Product</button>
      </div>
      <table className="w-full">
        <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
          <tr>
            <th className="p-4">SKU</th>
            <th className="p-4">Product</th>
            <th className="p-4">Category</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Price</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        {/* Table Rows here... */}
      </table>
    </div>
  );
};