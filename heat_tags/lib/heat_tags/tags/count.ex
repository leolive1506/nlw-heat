defmodule HeatTags.Tags.Count do
  alias HeatTags.Messages.Get

  # async_stream -> bom pra ler coleção msg, ja que espera uma coleção e cria processos sozinho a partir do tamanho da coleção

  def call do
    Get.today_messages()
    |> Task.async_stream(fn message -> count_words(message.message)end)
    |> Enum.reduce(%{}, fn elem, acc -> sum_values(elem, acc) end)
    |> IO.inspect()
  end

  defp count_words(message) do
    message
      |> String.split()
      |> Enum.frequencies()
  end

    defp sum_values({:ok, map1}, map2) do
      Map.merge(map1, map2, fn _key, value1, value2 -> value1 + value2 end)
  end
end
