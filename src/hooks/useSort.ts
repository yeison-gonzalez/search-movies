import { useState } from "react"

export const useSort = (): { sort: boolean, handleSort: () => void } => {
  const [sort, setSort] = useState<boolean>(false)

  const handleSort = () => {
    setSort(prevState => !prevState)
  }

  return {
    sort,
    handleSort
  }
}
