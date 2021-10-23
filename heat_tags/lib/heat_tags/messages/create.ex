defmodule HeatTags.Messages.Create do
  # definir um apelido usar alias (pega o ultimo nome)
  # mesma coisa que alias HeatTags.Message e alias HeatTags.Repo
  alias HeatTags.{Message, Repo}

  def call(params) do
    params
    |> Message.changeset()
    |> Repo.insert()
    |> handle_insert()
  end

  # funciton privada defp
  defp handle_insert({:ok, %Message{}} = result), do: result
  defp handle_insert({:error, result}), do: {:error, %{result: result, status: :bad_request}}
end
