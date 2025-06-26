document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');
    const wordlist = document.getElementById('wordlist');

    let artikelData = [];

    // 1. Ambil data artikel
    fetch('/artikel-2025/search_with_author.json')
      .then(res => res.json())
      .then(data => {
        artikelData = data;
      })
      .catch(error => console.error("Gagal memuat artikel:", error));

    // 2. Ambil daftar kata kunci dan tampilkan di <datalist>
    fetch('/artikel-2025/kata-kunci.json')
      .then(res => res.json())
      .then(kataKunci => {
        kataKunci.sort().forEach(word => {
          const opt = document.createElement('option');
          opt.value = word;
          wordlist.appendChild(opt);
        });
      })
      .catch(error => console.error("Gagal memuat kata kunci:", error));

    // 3. Matikan datalist saat input difokuskan jika < 3 huruf
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length < 3) {
        searchInput.removeAttribute('list');
      }
    });

    // 4. Tangani pencarian
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();

      if (query.length < 3) {
        searchInput.removeAttribute('list');
        resultsContainer.innerHTML = "<p class='text-muted'>Ketik minimal 3 huruf untuk melihat saran dan hasil.</p>";
        return;
      }

      // Aktifkan datalist
      searchInput.setAttribute('list', 'wordlist');

      // Filter berdasarkan judul, isi, atau penulis
      const filtered = artikelData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        (item.penulis && item.penulis.join(', ').toLowerCase().includes(query))
      );

      // Tampilkan hasil
      resultsContainer.innerHTML = filtered.length
        ? filtered.map(item => `
          <div class="card mb-3 border-0 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">
                <a href="${item.url}" class="text-decoration-none text-dark">${item.title}</a>
              </h5>
              <p class="text-muted mb-1"><strong>Penulis:</strong> ${item.penulis.join(', ')}</p>
              <p class="card-text">${item.content.slice(0, 150)}...</p>
            </div>
          </div>
        `).join('')
        : "<p class='text-muted'>Tidak ditemukan artikel dengan kata tersebut.</p>";
    });
  });