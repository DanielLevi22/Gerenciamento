import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import {TableHeader} from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs from 'dayjs'
import'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)
dayjs.locale('pt-br')



interface attend {
  id: string
  name: string
  email: string
  createdAt: string | null
  checkedInAt: string
}



export function AttendeeList() {
  const [search ,setSearch] = useState(() => {
    const url = new URL(window.location.toString())
    if(url.searchParams.has('search') && url.searchParams) {
      return url.searchParams.get('search') ?? ''
    }
    return ''
  })
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())
    if(url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }
    return 1
  })
  const [attends, setAttends] = useState<attend[]>([])
  const  [total, setTotal ] = useState(0)
  const totalPage = Math.ceil(total / 10)

  useEffect(() => {
    const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')
    url.searchParams.set('pageIndex', String( page -1))
    if(search.length > 0) {
      url.searchParams.set('query', search)
    }
    fetch(url)
    .then(response => response.json())
    .then(
      data => {
        setAttends(data.attendees)
        setTotal(data.total)
      })
  },[page,search])

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())
    url.searchParams.set('search', search)
    window.history.pushState({}, "", url)
    setSearch(search)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())
    url.searchParams.set('page', String(page))
    window.history.pushState({}, "", url)
    setPage(page)
  }

  function onSearchInputChanged(event:ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  function goToNextPage() {
    setCurrentPage(page + 1)
  
  }
  function goToPreviousPage() {
    setCurrentPage(page - 1)
  }

  function goToLastPage() {
    setCurrentPage(totalPage)
  }
  function goToFirstPage() {
  
    setCurrentPage(page + 1)
  }
 
  return(
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm w-72 flex items-center gap-3" >
          <Search className="size-4 text-emerald-300"/>
          <input value={search} onChange={onSearchInputChanged} type="text"  className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0" placeholder="Buscando participantes..." />
        </div>
      </div>
      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }} >
              <input type="checkbox" className="size-4 bg-black/20 border border-white/10 rounded " />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}> </TableHeader>
          </tr>
        </thead>
        <tbody>
          {attends.map((attend) => {
          return (
            <TableRow key={attend.id} >
            <TableCell >
              <input type="checkbox" className="size-4 bg-black/20 border border-white/10 rounded " />
            </TableCell>
            <TableCell >{attend.id}</TableCell>
            <TableCell >
              <div className="flex flex-col gap-1">
                <span className="font-semi text-white">{attend.name}</span>
                <span>{attend.email}</span>
              </div>
            </TableCell>
              <TableCell >{dayjs().to(attend.createdAt)}</TableCell>
              <TableCell >{
                attend.checkedInAt === null ? 
                <span className="text-zinc-500">Não fez checkin</span> 
                : dayjs().to(attend.checkedInAt)}
              </TableCell>
            <td>
              <IconButton transparent  >
                <MoreHorizontal className="size-4" />
              </IconButton>
            </td>
          </TableRow>

          )
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell  colSpan={3}>Mostrando  {attends.length} de {total}  itens</TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className=" inline-flex items-center gap-8">
                <span>  Página {page} de {totalPage}</span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4"  />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPage}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPage}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}