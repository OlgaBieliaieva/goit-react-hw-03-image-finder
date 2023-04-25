function Button({ page, onChangePage, isActive }) {
  console.log(page);

  return (
    <button
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
