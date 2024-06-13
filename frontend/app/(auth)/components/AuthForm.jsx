'use client';

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { BsGithub, BsGoogle } from 'react-icons/bs';

// import Input from "@/app/components/Input";
import Input from "../../components/Input";
import Button from "../../components/Button";
// import Button from "@/app/components/Button";

import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) => prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN');
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', data))
      .catch(() => toast.error('Invalid data!'))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials');
        }

        if (callback?.ok && !callback?.error) {
          toast.success('Logged in!');
          router.push('/dashboard');
        }
      })
      .finally(() => setIsLoading(false));
    }
  }

  // const socialAction = (action) => {
  //   setIsLoading(true);

  //   signIn(action, { redirect: false })
  //   .then((callback) => {
  //     if (callback?.error) {
  //       toast.error('Invalid Credentials');
  //     }

  //     if (callback?.ok && !callback?.error) {
  //       toast.success('Logged in!')
  //     }
  //   })
  //   .finally(() => setIsLoading(false));
  // }

  return (
    <div
      className="
        mt-4
        mx-auto
        w-100
      "
      style={{maxWidth: 28+"rem"}}
    >
      <div
        className="
          py-4
          px-5
          shadow
          rounded
        "
      >
        <form
          className="form"
          onSubmit={handleSubmit(onSubmit)}
          >
          <Input
              id="username"
              label="Username"
              register={register}
              errors={errors}
              disabled={isLoading}
          />
          {variant === 'REGISTER' && (
              <>
                  <Input
                      id="name"
                      label="Name"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                  />
                  <Input
                      id="email"
                      label="Email address"
                      type="email"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                  />
              </>
          )}
          <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
              disabled={isLoading}
          />
          {variant === 'REGISTER' && (
              <Input
                  id="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
              />
          )}
          <div className="my-4">
              <Button
              disabled={isLoading}
              fullWidth
              type="submit"
              >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
              </Button>
          </div>
        </form>

        {/* <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute
                inset-0
                flex
                items-center
              "
            >
              <div
                className="
                  w-full
                  border-t
                  border-gray-300"
              />
            </div>
            <div className="
              relative
              flex
              justify-center
              text-sm
            "
          >
              <span className="
                bg-white
                px-2
                text-gray-500">
                  Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div> */}

        <div className="
          flex
          gap-2
          justify-center
          text-sm
          mt-6
          text-gray-500
        ">
          <div>
            {variant === 'LOGIN' ? 'New to Twitter?' : 'Already have an account?'}
          </div>
          <div
            onClick={toggleVariant}
            className="text-decoration-underline"
            style={{cursor: 'pointer'}}
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
