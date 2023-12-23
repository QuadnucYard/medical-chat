export function redirectLogin() {
  const router = useRouter();
  console.log(router);
  router.push({ name: "login", query: { redirect: router.currentRoute.value.fullPath } });
}
