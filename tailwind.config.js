/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/*.html"],
  theme: {
    extend: {
      backgroundImage: {
        'backimg':
          'url("https://images.unsplash.com/photo-1518527989017-5baca7a58d3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")',
        'backimg2':
          'url("https://cdn.pixabay.com/photo/2021/09/16/21/27/container-ship-6631117_1280.jpg")',
        'backimg3' :
          'url("https://drive.google.com/uc?export=view&id=1m2oWLMFfu93HlVyPzG406U6gMNwZzUFc")',
      },
    },
  },
  plugins: [],
};
