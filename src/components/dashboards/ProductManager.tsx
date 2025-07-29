import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const initialProducts: Product[] = [
  { id: 'p1', name: 'Water Filter', price: 25, stock: 10 },
  { id: 'p2', name: 'Solar Lamp', price: 15, stock: 5 },
];

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [form, setForm] = useState({ name: '', price: '', stock: '' });
  const [editing, setEditing] = useState<string | null>(null);

  const handleAdd = () => {
    if (!form.name || !form.price || !form.stock) return;
    setProducts([...products, { id: Date.now().toString(), name: form.name, price: Number(form.price), stock: Number(form.stock) }]);
    setForm({ name: '', price: '', stock: '' });
  };
  const handleEdit = (id: string) => {
    const p = products.find(p => p.id === id);
    if (p) {
      setForm({ name: p.name, price: p.price.toString(), stock: p.stock.toString() });
      setEditing(id);
    }
  };
  const handleSave = () => {
    setProducts(products.map(p => p.id === editing ? { ...p, name: form.name, price: Number(form.price), stock: Number(form.stock) } : p));
    setForm({ name: '', price: '', stock: '' });
    setEditing(null);
  };
  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Manage Products</h3>
      <table className="w-full mb-4">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn-secondary mr-2" onClick={() => handleEdit(p.id)}>Edit</button>
                <button className="btn-warning" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">{editing ? 'Edit Product' : 'Add Product'}</h4>
        <input className="border rounded px-2 py-1 mr-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border rounded px-2 py-1 mr-2" placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input className="border rounded px-2 py-1 mr-2" placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        {editing ? (
          <>
            <button className="btn-primary mr-2" onClick={handleSave}>Save</button>
            <button className="btn-secondary" onClick={() => { setEditing(null); setForm({ name: '', price: '', stock: '' }); }}>Cancel</button>
          </>
        ) : (
          <button className="btn-primary" onClick={handleAdd}>Add</button>
        )}
      </div>
    </div>
  );
};

export default ProductManager; 