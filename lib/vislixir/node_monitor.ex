defmodule Vislixir.NodeMonitor do
  use GenServer
  require Logger
  alias VislixirWeb.TraceChannel

  def start_link do
    GenServer.start_link(__MODULE__, [])
  end

  def init([]) do
    :ok = :net_kernel.monitor_nodes(true)

    {:ok, nil}
  end

  def handle_info({:nodeup, node}, state) do
    Logger.info("[Vislixir] Connection to #{node} established.")

    VislixirWeb.NodesChannel.refresh()

    {:noreply, state}
  end

  def handle_info({:nodedown, node}, state) do
    Logger.warn("[Vislixir] Lost connection to #{node}...")

    TraceChannel.announce_cleanup(node)
    VislixirWeb.NodesChannel.refresh()

    {:noreply, state}
  end
end
