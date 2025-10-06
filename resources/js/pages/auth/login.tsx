import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, Leaf } from 'lucide-react';

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  return (
    <AuthLayout
      title={
        <div className="flex flex-col items-center">
          {/* Dekorasi judul */}
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-8 bg-[#B4A77E]" />
            <Leaf className="text-[#B4A77E]" size={20} />
            <div className="h-[2px] w-8 bg-[#B4A77E]" />
          </div>
          <h2 className="mt-2 text-lg font-bold text-gray-800">
            Selamat Datang di <span className="text-[#B4A77E]">PanganKu</span>
          </h2>
          <p className="mt-1 text-gray-600 text-sm">
            Masukkan email dan kata sandi Anda untuk melanjutkan
          </p>
        </div>
      }
    >
      <Head title="Login" />

      {/* Container lebih rapat, tanpa min-h-screen */}
      <div className="flex flex-col items-center bg-white py-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-[#B4A77E]/40 p-6 mt-3">
          <Form
            {...AuthenticatedSessionController.store.form()}
            resetOnSuccess={['password']}
            className="flex flex-col gap-4"
          >
            {({ processing, errors }) => (
              <>
                <div className="grid gap-4">
                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Alamat Email</Label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B4A77E] h-5 w-5"
                        strokeWidth={2.5}
                      />
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="email"
                        placeholder="nama@email.com"
                        className="pl-10 bg-[#FFFFF0] border-[#B4A77E]/60"
                      />
                    </div>
                    <InputError message={errors.email} />
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Kata Sandi</Label>
                      {canResetPassword && (
                        <TextLink
                          href={request()}
                          className="ml-auto text-sm text-[#B4A77E] hover:underline"
                          tabIndex={5}
                        >
                          Lupa Kata Sandi?
                        </TextLink>
                      )}
                    </div>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B4A77E] h-5 w-5"
                        strokeWidth={2.5}
                      />
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                        tabIndex={2}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="pl-10 bg-[#FFFFF0] border-[#B4A77E]/60"
                      />
                    </div>
                    <InputError message={errors.password} />
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center space-x-3">
                    <Checkbox id="remember" name="remember" tabIndex={3} />
                    <Label htmlFor="remember">Ingat saya / tetap masuk</Label>
                  </div>

                  {/* Tombol Login */}
                  <Button
                    type="submit"
                    className="mt-2 w-full bg-[#B4A77E] hover:bg-[#9e926e] text-white py-2 rounded-lg font-semibold transition duration-200"
                    tabIndex={4}
                    disabled={processing}
                    data-test="login-button"
                  >
                    {processing && (
                      <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                    )}
                    Masuk
                  </Button>
                </div>

                {/* Register link */}
                <div className="text-center text-sm text-gray-600 mt-3">
                  Belum Punya Akun?{' '}
                  <TextLink
                    href={register()}
                    tabIndex={5}
                    className="text-[#B4A77E] hover:underline font-semibold"
                  >
                    Daftar
                  </TextLink>
                </div>
              </>
            )}
          </Form>

          {status && (
            <div className="mt-3 text-center text-sm font-medium text-[#B4A77E]">
              {status}
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
