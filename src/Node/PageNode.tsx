import { NodeData } from "../utils/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/AppStateContext";
import { supabase } from "../supabaseClient";
import cx from "classnames";
import styles from "./Node.module.css"

type PageNodeProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
};

export const PageNode = ({ node, isFocused, index }: PageNodeProps) => {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState("");
  const { removeNodeByIndex } = useAppState();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "Backspace") {
        removeNodeByIndex(index);
      }
      if (event.key === "Enter") {
        navigate(`/${node.value}`);
      }
    };
    if (isFocused) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, removeNodeByIndex, index, navigate, node]);

  useEffect(() => {
    const fetchPageTitle = async () => {
      const { data } = await supabase
        .from("page")
        .select("title")
        .eq("slug", node.value)
        .single();
      setPageTitle(data?.title);
    };
    if (node.type === "page" && node.value) {
      fetchPageTitle();
    }
  }, [node.type, node.value]);

  const navigateToPage = () => {
    navigate(`/${node.value}`);
  };

  return (
    <div
      onClick={navigateToPage}
      className={cx(styles.node, styles.page, {
        [styles.focused]: isFocused,
      })}
    >
      📄 {pageTitle}
    </div>
  );
};
