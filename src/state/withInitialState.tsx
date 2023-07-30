import { Page } from "../utils/types";
import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import startPageScaffold from "./startPageScaffold.json";
import styles from "../utils.module.css";
import { Loader } from "../components/Loader";

type InjectedProps = {
  initialState: Page;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

export function withInitialState<TProps>(
  WrappedComponent: React.ComponentType<
    PropsWithoutInjected<TProps> & InjectedProps
  >
) {
  return (props: PropsWithoutInjected<TProps>) => {
    const match = useMatch("/:slug");
    const pageSlug = match ? match.params.slug : "start";

    const [initialState, setInitialState] = useState<Page | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
      setIsLoading(true);
      const fetchInitialState = async () => {
        try {
          const { data: userData } = await supabase.auth.getUser();
          const user = userData.user;
          if (!user) {
            throw new Error("User is not logged in");
          }
          const { data } = await supabase
            .from("pages")
            .select("title, id, cover, nodes, slug")
            .match({ slug: pageSlug, created_by: user.id })
            .single();
          if (!data && pageSlug === "start") {
            const result = await supabase
              .from("pages")
              .insert({
                ...startPageScaffold,
                slug: "start",
                created_by: user.id,
              })
              .single();
            setInitialState(result?.data);
          } else {
            setInitialState(data);
          }
        } catch (e) {
          if (e instanceof Error) {
            setError(e);
          }
        }
        setIsLoading(false);
      };
      fetchInitialState();
    }, [pageSlug]);

    if (isLoading) {
      return (
        <div className={styles.centeredFlex}>
          <Loader />
        </div>
      );
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    if (!initialState) {
      return <div className={styles.centeredFlex}>Page not found</div>;
    }

    return <WrappedComponent {...props} initialState={initialState} />;
  };
}
