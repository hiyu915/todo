import { useState } from "react";

type Todo = {
  id: string;
  title: string;
};

function App() {
  // 追加されたTodoの一覧
  const [todos, setTodos] = useState<Todo[]>([]);
  // 入力欄に今打ってる文字
  const [input, setInput] = useState("");

  // 編集中のTodoのid(編集していないときはnull)
  const [editingId, setEditingId] = useState<string | null>(
    null,
  );
  // 編集中の入力欄の文字
  const [editingTitle, setEditingTitle] = useState("");

  return (
    <div>
      <h1>Todo</h1>

      <form
        onSubmit={(e) => {
          // デバッグ用
          console.log(e);

          // preventDefault：<form>は本来、送信されると入力内容をサーバーに送り、その結果のページに遷移する動きをする。
          // 送信先(action)を書いていなければ今のページに送るので、ページの再読み込みになり、今回の場合入力した値が空になる。
          // 関数の最初に置くのが定番。「このあと標準動作をやらないで」という印を付けておくもの。
          e.preventDefault();
          // trim()で前後の空白を省き、入力文字が空白ならreturn
          if (input.trim() === "") return;
          const newTodo: Todo = {
            // randomUUID() は Crypto インターフェイスのメソッドで、暗号強度の強い乱数生成器を用いて v4 UUID を生成するのに用いられる。
            id: crypto.randomUUID(),
            title: input.trim(),
          };
          // (...)はスプレッド構文。配列の中身を1個ずつ展開する。
          setTodos([...todos, newTodo]);
          setInput("");
        }}
      >
        <input
          value={input}
          // e.target.value = 今、入力欄に入っている文字
          onChange={(e) => setInput(e.target.value)}
          placeholder="やることを入力"
        />
        <button type="submit">追加</button>
      </form>

      <ul>
        {/* map：todos の件数分、1件ずつ todo に入れて <li> を作る */}
        {todos.map((todo) => (
          <li key={todo.id}>
            {/*
              各行が「自分が編集中の行か？」を確認する
              （editingId と、 todo.id を見比べる）
                一致する   → 編集中の表示（入力欄＋保存・キャンセル）
                一致しない → 通常の表示（タイトル＋編集・削除）
            */}
            {editingId === todo.id ? (
              // 編集中
              <>
                <input
                  value={editingTitle}
                  // 打つたびに下書き（editingTitle）だけを更新する。todos はまだ変えない
                  onChange={(e) =>
                    setEditingTitle(e.target.value)
                  }
                />
                <button
                  onClick={() => {
                    // 編集中の空チェック+trim
                    if (editingTitle.trim() === "") return;
                    // 下書きを todos に反映する
                    // map で全件を見て、編集中の id のものだけタイトルを差し替え、それ以外はそのまま返す
                    // { ...t, title: ... }：t の中身をコピーして、title だけ上書きした新しいオブジェクト
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id
                          ? {
                              ...t,
                              title: editingTitle.trim(),
                            }
                          : t,
                      ),
                    );
                    // editingId を null にして、全行を通常表示に戻す
                    setEditingId(null);
                  }}
                >
                  保存
                </button>
                {/* キャンセル：editingId を null にするだけ。todos は触っていないので元のタイトルのまま */}
                <button onClick={() => setEditingId(null)}>
                  キャンセル
                </button>
              </>
            ) : (
              // 通常時
              <>
                {todo.title}
                <button
                  onClick={() => {
                    // 編集中の表示に
                    setEditingId(todo.id);
                    // 今のタイトルを下書きにコピー（入力欄に元の文字が入った状態で始めるため）
                    setEditingTitle(todo.title);
                  }}
                >
                  編集
                </button>
                <button
                  onClick={() => {
                    // 削除対象を除いた新しい配列を作る
                    setTodos(
                      todos.filter((t) => t.id !== todo.id),
                    );
                  }}
                >
                  削除
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
