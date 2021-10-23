defmodule HeatTags.Messages.Get do

  import Ecto.Query

  alias HeatTags.{Message, Repo}

  def today_messages do
    # definir as msg do dia
    # Date.utc_today() pega a data de hoje
    today = Date.utc_today()
    query = from message in Message, where: type(message.inserted_at, :date) == ^today
    Repo.all(query)
    # usou ^ pra fixar valor de today
  end


end
