fetch("artikel-2025/list.json")
  .then((res) => res.json())
  .then((data) => {
    const wrapper = document.getElementById("artikel-wrapper");
    data.forEach((item) => {
      const penulisGabung = item.penulis.join(", ");
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
            <div class="testimonial-card">
              <div class="testimonial-content">
                <p><i class="bi bi-quote quote-icon"></i> ${item.content}</p>
              </div>
              <div class="testimonial-profile">
                <div class="rating"></div>
                <div class="profile-info">
                  <div>
                    <h3><a href="${item.url}">${penulisGabung}</a></h3>
                    <h4>Penulis</h4>
                  </div>
                </div>
              </div>
            </div>
          `;
      wrapper.appendChild(slide);
    });

    // Inisialisasi Swiper setelah render selesai
    new Swiper(
      ".testimonials-slider",
      JSON.parse(document.querySelector(".swiper-config").textContent)
    );
  });
