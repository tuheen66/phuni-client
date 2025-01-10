import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "0001",
      password: "admin12345",
    },
  });

  //
  const [login] = useLoginMutation();

  //   console.log("data =>", data);
  //   console.log("error =>", error);

  const onSubmit = async (data) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };

    const res = await login(userInfo).unwrap();

    const user = verifyToken(res.data.accessToken);

    dispatch(setUser({ user: user, token: res.data.accessToken }));
  };

  return (
    <div style={{ marginTop: 20, marginLeft: 20 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginTop: 20 }}>
          <label style={{ marginRight: 20 }} htmlFor="id">
            ID
          </label>
          <input type="text" id="id" {...register("userId")} />
        </div>
        <div style={{ marginTop: 20 }}>
          <label style={{ marginRight: 20 }} htmlFor="password">
            Password
          </label>
          <input type="text" id="password" {...register("password")} />
        </div>
        <Button htmlType="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
