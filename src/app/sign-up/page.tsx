"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showVideo, setShowVideo] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    signIn("google", { callbackUrl: "/home-layout" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setPending(false);
      toast.success(data.message);
      router.push("/sign-in");
    } else {
      setError(data.message);
      setPending(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* GIF - 60% da tela em desktop, full em mobile */}
      <div className="hidden md:block w-[60%] h-full">
        <img
          src="/video.gif"
          alt="GIF animado"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Formulário - 40% da tela em desktop, full em mobile */}
      <div className="w-full md:w-[40%] h-full flex items-center justify-center bg-white relative">
        {/* Background GIF para mobile/tablet */}
        <div className="md:hidden absolute inset-0 z-0">
          <img
            src="/video.gif"
            alt="GIF animado"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {showVideo ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <video
              ref={videoRef}
              src="/loading.mp4"
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain"
              onEnded={handleVideoEnd}
            />
          </div>
        ) : (
          <div className="w-[90%] max-w-sm p-6 text-black z-10 bg-white md:bg-transparent rounded-lg md:rounded-none shadow-lg md:shadow-none">
            <CardHeader className="p-0 flex justify-center">
              <img
                src="/pkm.png"
                alt="Logo Pokémon"
                className="h-40 object-contain"
              />
            </CardHeader>

            {!!error && (
              <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                <TriangleAlert />
                <p>{error}</p>
              </div>
            )}

            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="text"
                  disabled={pending}
                  placeholder="Nome completo"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
                <Input
                  type="email"
                  disabled={pending}
                  placeholder="E-mail"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    disabled={pending}
                    placeholder="Senha"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    disabled={pending}
                    placeholder="Confirme a senha"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <Button
                  className="w-full text-white bg-[#2A75BB] hover:bg-[#1a4c85] text-base cursor-pointer"
                  size="lg"
                  disabled={pending}
                >
                  Cadastre-se
                </Button>
              </form>

              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-4 text-sm text-gray-500 whitespace-nowrap">
                  Ou cadastre com
                </span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>

              <div className="flex justify-center">
                <Button
                  disabled={pending}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowVideo(true);
                  }}
                  variant="outline"
                  size="lg"
                  className="bg-slate-300 hover:bg-slate-400 hover:scale-110 transition-transform cursor-pointer"
                >
                  <FcGoogle className="size-6 mr-2" />
                  Google
                </Button>
              </div>

              <p className="text-center text-sm mt-4 text-muted-foreground">
                Já possui uma conta?{" "}
                <Link className="text-sky-700 hover:underline" href="sign-in">
                  Entre
                </Link>
              </p>
            </CardContent>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;