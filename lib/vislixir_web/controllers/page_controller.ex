defmodule VislixirWeb.PageController do
  use VislixirWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
