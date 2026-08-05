import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Star, MapPin, Clock, ShieldCheck, Zap, X, Trash2, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const products = [
  {
    "precio": 18,
    "descripcion": "Delicioso chicharrón crujiente a la leña con camote frito y salsa criolla.",
    "nombre": "Sánguche de Chicharrón",
    "imagenUrl": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af"
  },
  {
    "precio": 16,
    "descripcion": "Jugoso pavo horneado a la leña servido en pan artesanal con salsa criolla.",
    "nombre": "Sánguche de Pavo",
    "imagenUrl": "https://images.unsplash.com/photo-1509722747041-616f39b57569"
  }
];
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('yape');

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.nombre === product.nombre);
      if (exists) {
        return prev.map(p => p.nombre === product.nombre ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (nombre, qty) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(p => p.nombre !== nombre));
      return;
    }
    setCart(prev => prev.map(p => p.nombre === nombre ? { ...p, qty } : p));
  };

  const total = cart.reduce((sum, item) => sum + (item.precio * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const sendWhatsAppOrder = () => {
    const details = cart.map(i => "• " + i.qty + "x " + i.nombre + " (S/ " + (i.precio * i.qty).toFixed(2) + ")").join('%0A');
    const msg = "¡Hola *Sanguchería El Tigre*! Deseo realizar este pedido:%0A%0A" + details + "%0A%0A*Total: S/ " + total.toFixed(2) + "*%0A*Método de Pago: " + paymentMethod.toUpperCase() + "*%0A%0AAtendido vía web.";
    window.open("https://wa.me/51987654321?text=" + msg, '_blank');
    setIsPaymentOpen(false);
  };

  return (
    <div class="min-h-screen flex flex-col justify-between selection:bg-red-500 selection:text-white">
      {/* Navbar */}
      <header class="bg-slate-900 text-white sticky top-0 z-40 shadow-xl border-b border-slate-800">
        <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-red-600/30">
              S
            </div>
            <div>
              <h1 class="text-xl font-black tracking-tight leading-none">Sanguchería El Tigre</h1>
              <span class="text-[11px] text-slate-400 font-medium">Los mejores sánguches a la leña en Piura</span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <a href="https://wa.me/51987654321" target="_blank" class="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg shadow-green-500/20 transition">
              <MessageCircle class="w-4 h-4" /> WhatsApp
            </a>
            <button onClick={() => setIsCartOpen(true)} class="relative bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-red-600/20 transition flex items-center gap-2">
              <ShoppingBag class="w-4 h-4" />
              <span class="hidden sm:inline">Carrito</span>
              {cartCount > 0 && (
                <span class="bg-white text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section class="relative bg-gradient-to-br from-red-600 via-red-700 to-amber-700 text-white py-16 px-6 overflow-hidden">
        <div class="max-w-6xl mx-auto relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="max-w-2xl">
            <span class="inline-flex items-center gap-2 bg-red-800/60 border border-red-500/30 text-red-100 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
              <Zap class="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" /> Preparación Fresca e Inmediata
            </span>
            <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Sanguchería El Tigre
            </h2>
            <p class="text-red-100 mt-3 text-lg leading-relaxed font-medium">
              Los mejores sánguches a la leña en Piura
            </p>

            <div class="mt-8 flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold">
              <div class="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                <ShieldCheck class="w-4 h-4 text-green-400" /> Pagos con Yape, Plin y Efectivo
              </div>
              <div class="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                <Clock class="w-4 h-4 text-yellow-300" /> Delivery Rápido en Piura
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <main class="max-w-6xl mx-auto px-6 py-14 flex-1 w-full">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-2xl font-black text-slate-900">Carta & Menú</h3>
            <p class="text-slate-500 text-xs mt-1">Selecciona tus platillos y arma tu pedido en segundos</p>
          </div>
          <span class="text-xs font-bold bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
            2 Productos
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, idx) => (
            <div key={idx} class="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div class="h-48 overflow-hidden relative">
                  <img src={p.imagenUrl} alt={p.nombre} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span class="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full">
                    S/ {p.precio.toFixed(2)}
                  </span>
                </div>
                <div class="p-6">
                  <h4 class="text-lg font-bold text-slate-900 group-hover:text-red-600 transition">{p.nombre}</h4>
                  <p class="text-slate-500 text-xs mt-2 leading-relaxed">{p.descripcion || 'Especialidad preparada con insumos frescos de primera calidad.'}</p>
                </div>
              </div>

              <div class="p-6 pt-0">
                <button
                  onClick={() => addToCart(p)}
                  class="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3 rounded-2xl shadow-lg shadow-red-600/20 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Agregar al Pedido</span>
                  <ShoppingBag class="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Opiniones */}
        <section class="mt-20 border-t border-slate-200 pt-12">
          <h3 class="text-xl font-bold text-slate-900 text-center mb-8">Lo que dicen nuestros clientes en Piura</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div class="flex text-yellow-400 gap-1 mb-2"><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /></div>
              <p class="text-xs text-slate-600 italic">"¡Excelente sabor y el pedido por WhatsApp me llegó súper rápido!"</p>
              <span class="text-xs font-bold text-slate-900 block mt-3">— Carlos M. (San Eduardo)</span>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div class="flex text-yellow-400 gap-1 mb-2"><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /></div>
              <p class="text-xs text-slate-600 italic">"Pagué con Yape en 5 segundos y todo fresco. 100% recomendado."</p>
              <span class="text-xs font-bold text-slate-900 block mt-3">— Maria F. (Santa Isabel)</span>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div class="flex text-yellow-400 gap-1 mb-2"><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /><Star class="w-4 h-4 fill-yellow-400" /></div>
              <p class="text-xs text-slate-600 italic">"Buena atención y porciones generosas. Mi lugar favorito."</p>
              <span class="text-xs font-bold text-slate-900 block mt-3">— Jorge L. (Centro de Piura)</span>
            </div>
          </div>
        </section>
      </main>

      {/* Drawer de Carrito */}
      {isCartOpen && (
        <div class="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div class="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div class="flex items-center justify-between border-b pb-4">
                <h3 class="text-lg font-bold text-slate-900">Tu Pedido Actual</h3>
                <button onClick={() => setIsCartOpen(false)} class="p-2 hover:bg-slate-100 rounded-full text-slate-500"><X class="w-5 h-5" /></button>
              </div>

              {cart.length === 0 ? (
                <div class="py-24 text-center text-slate-400">
                  <ShoppingBag class="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p class="text-sm font-semibold">Aún no has agregado productos.</p>
                </div>
              ) : (
                <div class="mt-6 flex flex-col gap-4 divide-y divide-slate-100">
                  {cart.map((item, idx) => (
                    <div key={idx} class="pt-4 flex items-center justify-between gap-4">
                      <div class="flex-1">
                        <h4 class="font-bold text-sm text-slate-800">{item.nombre}</h4>
                        <span class="text-xs font-bold text-red-600">S/ {item.precio.toFixed(2)} c/u</span>
                      </div>
                      <div class="flex items-center gap-2 border border-slate-200 rounded-xl px-2.5 py-1">
                        <button onClick={() => updateQty(item.nombre, item.qty - 1)} class="text-xs font-bold px-1 text-slate-600 hover:text-red-600">-</button>
                        <span class="text-xs font-bold w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.nombre, item.qty + 1)} class="text-xs font-bold px-1 text-slate-600 hover:text-red-600">+</button>
                      </div>
                      <button onClick={() => updateQty(item.nombre, 0)} class="text-slate-300 hover:text-red-600 p-1"><Trash2 class="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div class="border-t pt-4 mt-6">
                <div class="flex justify-between items-center mb-4">
                  <span class="text-slate-500 text-xs font-semibold">Monto Total:</span>
                  <span class="text-2xl font-black text-red-600">S/ {total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => { setIsCartOpen(false); setIsPaymentOpen(true); }}
                  class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 transition active:scale-98"
                >
                  <span>Proceder al Pago</span>
                  <ArrowRight class="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Pagos */}
      {isPaymentOpen && (
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsPaymentOpen(false)} class="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"><X class="w-5 h-5" /></button>

            <h3 class="text-lg font-bold text-slate-900 border-b pb-3">Método de Pago</h3>

            <div class="mt-4 grid grid-cols-3 gap-2">
              <button onClick={() => setPaymentMethod('yape')} class={"py-3 rounded-2xl border font-bold text-xs flex flex-col items-center gap-1 transition " + (paymentMethod === 'yape' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-600')}>
                <Smartphone class="w-4 h-4" /> Yape
              </button>
              <button onClick={() => setPaymentMethod('plin')} class={"py-3 rounded-2xl border font-bold text-xs flex flex-col items-center gap-1 transition " + (paymentMethod === 'plin' ? 'border-cyan-600 bg-cyan-50 text-cyan-700' : 'border-slate-200 text-slate-600')}>
                <Smartphone class="w-4 h-4" /> Plin
              </button>
              <button onClick={() => setPaymentMethod('efectivo')} class={"py-3 rounded-2xl border font-bold text-xs flex flex-col items-center gap-1 transition " + (paymentMethod === 'efectivo' ? 'border-green-600 bg-green-50 text-green-700' : 'border-slate-200 text-slate-600')}>
                💵 Efectivo
              </button>
            </div>

            {(paymentMethod === 'yape' || paymentMethod === 'plin') && (
              <div class="mt-5 p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                <p class="text-[11px] text-slate-500 font-medium">Numero registrado para Yape/Plin:</p>
                <p class="text-base font-black text-slate-900 mt-0.5">+{whatsapp}</p>
              </div>
            )}

            <div class="mt-6 border-t pt-4 flex items-center justify-between">
              <div>
                <span class="text-[10px] text-slate-400 block font-semibold">Total a Pagar</span>
                <span class="text-xl font-black text-red-600">S/ {total.toFixed(2)}</span>
              </div>
              <button onClick={sendWhatsAppOrder} class="bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-5 rounded-2xl text-xs shadow-lg shadow-green-500/20 flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4" /> Enviar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer class="bg-slate-900 text-slate-400 py-8 text-center text-xs border-t border-slate-800 mt-16">
        <div class="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Sanguchería El Tigre. Todos los derechos reservados.</p>
          <div class="flex items-center gap-2 text-slate-400">
            <MapPin class="w-3.5 h-3.5 text-red-500" />
            <span>Piura, Perú</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
