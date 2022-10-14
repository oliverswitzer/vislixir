defmodule VislixirWeb.PageView do
  use VislixirWeb, :view

  def hostname do
    node() |> Atom.to_string() |> String.split("@") |> List.last()
  end
end
