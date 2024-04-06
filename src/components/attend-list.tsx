import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import {TableHeader} from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useState } from "react";
import { attends } from "../data/attendess";
import dayjs from 'dayjs'

import'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)
dayjs.locale('pt-br')


export function AttendeeList() {
  const [search,setSearch] = useState('')
  const [page, setPage] = useState(1)

  const totalPage = Math.ceil(attends.length / 10)

  function onSearchInputChanged(event:ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function goToNextPage() {
    setPage(page + 1)
  
  }
  function goToPreviousPage() {
    setPage(page - 1)
  }

  function goToLastPage() {
    setPage(totalPage)
  }
  function goToFirstPage() {
    setPage(1)

  }
 
  return(
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm w-72 flex items-center gap-3" >
          <Search className="size-4 text-emerald-300"/>
          <input onChange={onSearchInputChanged} type="text"  className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" placeholder="Buscando participantes..." />
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
          {attends.slice((page-1 ) * 10, page  * 10).map((attend) => {
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
              <TableCell >{dayjs().to(attend.checkedIntAt)}</TableCell>
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
            <TableCell  colSpan={3}>Mostrando  10 de {attends.length}  itens</TableCell>
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