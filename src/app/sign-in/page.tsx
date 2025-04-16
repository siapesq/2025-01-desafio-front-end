"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      setShowVideo(true);
      toast.success("Login feito com sucesso!");
    } else if (res?.status === 401) {
      setError("Credenciais inválidas!");
      setPending(false);
    } else {
      setError("Algo deu errado!");
    }
  };

  const handleVideoEnd = () => {
    router.push("/home-layout");
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
            className="w-full h-full object-cover opacity-20"
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
            <CardHeader className="p-0 mb-2 flex justify-center">
              <img
                src="/pkm.png"
                alt="Logo Pokémon"
                className="h-40 md:h-40 lg:h-40 object-contain mb-2"
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
                  type="email"
                  disabled={pending}
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    disabled={pending}
                    placeholder="Senha de acesso"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <Button
                  className="w-full text-white bg-[#2A75BB] hover:bg-[#1a4c85] text-base cursor-pointer"
                  size="lg"
                  disabled={pending}
                >
                  Conecte-se
                </Button>
              </form>

              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-4 text-sm text-gray-500 whitespace-nowrap">Ou acesse com</span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>

              <div className="flex justify-center">
                <Button
                  disabled={pending}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn("google", { callbackUrl: "/home-layout" });
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
                Ainda não é cadastrado?{" "}
                <Link className="text-sky-700 hover:underline" href="sign-up">
                  Cadastre-se!
                </Link>
              </p>
            </CardContent>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;