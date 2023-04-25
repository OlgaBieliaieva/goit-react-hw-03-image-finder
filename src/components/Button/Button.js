import css from './Button.module.css';

function Button({ page, onChangePage, isActive }) {
  console.log(page);

  return (
    <button
      className={css.Button}
      type="button"
      value={page}
      onClick={onChangePage}
      disabled={isActive}
    >
      Load more
    </button>
  );
}
export default Button;
