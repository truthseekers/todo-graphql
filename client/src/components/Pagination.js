const Pagination = ({ todosPerPage, totalTodos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <span
            style={{ padding: "10px" }}
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </span>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
