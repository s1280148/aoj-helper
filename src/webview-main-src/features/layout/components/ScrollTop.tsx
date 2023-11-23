import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ページ遷移時に一番上にスクロールするためのコンポーネント
 * @returns なし
 *
 * @remarks
 * React Router v6.4 で追加された <ScrollRestoration /> コンポーネントに置き換えたい
 */
const ScrollTop = () => {
  const location = useLocation();

  useEffect(() => {
    // locationが変更された場合に、一番上にスクロール
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default ScrollTop;
