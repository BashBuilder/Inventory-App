"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/hooks/features/authSlice";
import { addProfile, getProfile } from "@/lib/db";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
const ProductForm = () => {
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    getProfile().then((res) => {
      if (res.title && res.image) {
        router.push("/inventory");
      } else {
        setPageLoading(false);
      }
    });
  }, []);

  if (pageLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (title && image) {
        const imageData = await toBase64(image);
        const res = await addProfile({
          title,
          image: imageData,
        });
        dispatch(updateProfile({ title, image: imageData }));
        // Handle the form submission
      } else {
        alert("Please provide both title and image");
      }
    } catch (error) {
      console.log("Error adding profile:", error);
      alert(` Error adding profile: ${JSON.stringify(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="container mx-auto my-auto flex h-3/5 max-w-3xl flex-col items-center justify-center gap-5 space-y-4 bg-white p-8 shadow"
      >
        <h1 className="text-2xl font-bold text-gray-800"> Add Shop </h1>
        <div className="flex w-full max-w-64 flex-col items-center">
          <label htmlFor="title" className="mx-auto mb-1 text-center">
            Shop Name
          </label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full max-w-64 flex-col items-center justify-center">
          <label htmlFor="image" className="mb-1 text-center">
            Shop Logo
          </label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            required
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-500 px-4 py-2 text-white"
        >
          {loading ? "Loading..." : "Submit"}{" "}
        </Button>
      </form>
    </div>
  );
};

// const Auth = () => {
//   return <div>Auth page</div>;
// };

export default ProductForm;
