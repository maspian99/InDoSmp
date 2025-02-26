const express = require('express');
const midtransClient = require('midtrans-client');

const app = express();
app.use(express.json());

// Inisialisasi Midtrans Snap
const snap = new midtransClient.Snap({
  isProduction: false, // Ubah jadi true untuk live
  serverKey: 'SB-Mid-server-4IbFrdKoNxNgVuaivUU47T5b' // Ganti dengan Server Key Midtrans
});

// Route pembayaran
app.post('/charge', async (req, res) => {
  const { nickname, rank } = req.body;
  const harga = {
    Elite: 15000,
    Elder: 30000,
    Exeprt: 50000,
      Exclusive: 70000,
      Experience: 100000,
      Expromanced: 2000000,
      Exicontentacl: 350000
  };

  const parameter = {
    transaction_details: {
      order_id: `ORDER-${Date.now()}`,
      gross_amount: harga[rank]
    },
    item_details: [{
      id: rank,
      price: harga[rank],
      quantity: 1,
      name: `Rank ${rank}`
    }],
    customer_details: {
      first_name: nickname
    }
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    res.json({ token: transaction.token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));