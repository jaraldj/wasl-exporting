/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      backgroundImage: {
        'backimg':
          'url("https://images.unsplash.com/photo-1518527989017-5baca7a58d3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")',
        'backimg2':
          'url("https://media.istockphoto.com/id/1406705759/photo/stack-of-blue-container-boxes-with-sky-background-cargo-freight-shipping-for-import-and.jpg?s=2048x2048&w=is&k=20&c=DGYEXu6_GvJ4Iq9viMjcpZzQnYkj57YKswv8Jv67tVU=")',
      },
    },
  },
  plugins: [],
};
