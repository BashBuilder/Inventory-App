"use client";
import React from "react";
const ProductForm = () => {
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && image) {
      // Handle the form submission
      console.log("Title:", title);
      console.log("Image:", image);
    } else {
      alert("Please provide both title and image");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block">
          Product Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-2 py-1"
          required
        />
      </div>
      <div>
        <label htmlFor="image" className="mb-1 block">
          Product Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 px-4 py-2 text-white">
        Submit
      </button>
    </form>
  );
};

// const Auth = () => {
//   return <div>Auth page</div>;
// };

export default ProductForm;
