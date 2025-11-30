"use client"
import { ResAccountOrder_ListAll } from "@/interface/responseData/interfaceStorefront";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Image from 'next/image';

const TableAccountOrder: React.FC<ResAccountOrder_ListAll> = ({ data, included, meta, links }) => {
    const sxTableCellHead: SxProps<Theme> = {
        bgcolor: 'var(--color-green-100)',
        color: 'var(--color-green-900)',
        borderLeft: '1px solid var(--color-gray-200)',
        borderRight: '1px solid var(--color-gray-200)',
    }

    const sxTableCellBody: SxProps<Theme> = {
        borderLeft: '1px solid var(--color-gray-200)',
        borderRight: '1px solid var(--color-gray-200)',
    }

    const sxTypography: SxProps<Theme> = {
        textAlign: 'center'
    }

    const [selectedRow, setSelectedRow] = useState<string | null>(null);

    const [currentPage, setCurrenPage] = useState<number>(1)

    return (
        <>
            {data.length > 0 ?
                <div className="flex flex-col gap-5">
                    <TableContainer
                        component={Paper}
                        sx={{
                            maxHeight: '600px',
                            boxShadow: 3
                        }}
                    >
                        <Table stickyHeader sx={{ minWidth: 800 }} aria-label="orders table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={sxTableCellHead}>
                                        <Typography sx={sxTypography} variant="subtitle1" fontWeight="bold">Order #</Typography>
                                    </TableCell>
                                    <TableCell sx={sxTableCellHead}>
                                        <Typography sx={sxTypography} variant="subtitle1" fontWeight="bold">Date</Typography>
                                    </TableCell>
                                    <TableCell sx={sxTableCellHead}>
                                        <Typography sx={sxTypography} variant="subtitle1" fontWeight="bold">Payment State</Typography>
                                    </TableCell>
                                    <TableCell sx={sxTableCellHead}>
                                        <Typography sx={sxTypography} variant="subtitle1" fontWeight="bold">Shipment State</Typography>
                                    </TableCell>
                                    <TableCell sx={sxTableCellHead}>
                                        <Typography sx={sxTypography} variant="subtitle1" fontWeight="bold">Total</Typography>
                                    </TableCell>
                                    <TableCell sx={sxTableCellHead}>
                                        <Typography sx={sxTypography} variant="subtitle1" fontWeight="bold">Email</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((res) => (
                                    <TableRow key={res.id}
                                        hover
                                        onClick={() => {
                                            console.log("Row clicked:", res.id);
                                            setSelectedRow(res.id);
                                        }}
                                        tabIndex={-1}
                                        sx={{
                                            border: selectedRow === res.id ? '2px dashed var(--color-green-500)' : '',
                                            cursor: 'pointer',
                                            '&:nth-of-type(even)': { backgroundColor: 'var(--color-green-50)' },
                                            '&:hover': { backgroundColor: 'var(--color-green-50)' },
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <TableCell sx={sxTableCellBody}>
                                            <Typography sx={sxTypography} variant="body2" fontWeight="medium">
                                                {res.attributes.number}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={sxTableCellBody}>
                                            <Typography sx={sxTypography} variant="body2" fontWeight="medium">
                                                {new Date(res.attributes.completed_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={sxTableCellBody}>
                                            <Typography sx={sxTypography} variant="body2" fontWeight="medium">
                                                {res.attributes.payment_state === 'paid' &&
                                                    <span className="text-md font-semibold px-3 py-[4px] rounded-full bg-emerald-100 text-emerald-700 shadow-md backdrop-blur-md">{res.attributes.payment_state}</span>
                                                }
                                                {res.attributes.payment_state === 'pending' &&
                                                    <span className="text-md font-semibold px-3 py-[4px] rounded-full bg-yellow-100 text-yellow-700 shadow-md backdrop-blur-md">{res.attributes.payment_state}</span>
                                                }
                                                {res.attributes.payment_state === 'failed' &&
                                                    <span className="text-md font-semibold px-3 py-[4px] rounded-full bg-red-100 text-red-700 text-white shadow-md backdrop-blur-md">{res.attributes.payment_state}</span>
                                                }
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={sxTableCellBody}>
                                            <Typography sx={sxTypography} variant="body2" fontWeight="medium">
                                                {res.attributes.shipment_state === 'ready' &&
                                                    <span className="text-md font-semibold px-3 py-[4px] rounded-full bg-purple-100 text-purple-700 shadow-md backdrop-blur-md">
                                                        {res.attributes.shipment_state}
                                                    </span>
                                                }
                                                {res.attributes.shipment_state === 'delivered' &&
                                                    <span className="text-md font-semibold px-3 py-[4px] rounded-full bg-indigo-100 text-indigo-700 shadow-md backdrop-blur-md">
                                                        {res.attributes.shipment_state}
                                                    </span>
                                                }
                                                {res.attributes.shipment_state === 'shipping' &&
                                                    <span className="text-md font-semibold px-3 py-[4px] rounded-full bg-blue-100 text-blue-700 shadow-md backdrop-blur-md">
                                                        {res.attributes.shipment_state}
                                                    </span>
                                                }
                                                {res.attributes.shipment_state === 'pending' &&
                                                    <span className="text-md font-semibold px-3 py-[4px] rounded-full bg-yellow-100 text-yellow-700 shadow-md backdrop-blur-md">
                                                        {res.attributes.shipment_state}
                                                    </span>
                                                }
                                            </Typography>
                                        </TableCell >
                                        <TableCell sx={sxTableCellBody}>
                                            <Typography sx={sxTypography} variant="body2" fontWeight="medium">
                                                {res.attributes.display_total}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={sxTableCellBody}>
                                            <Typography sx={sxTypography} variant="body2" fontWeight="medium">
                                                {res.attributes.email}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {meta.total_pages > 1 && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center ">
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-gray-800">{meta.count * (currentPage - 1) + 1}</span> to{' '}
                                <span className="font-semibold text-gray-800">{Math.min(meta.count * currentPage, meta.total_count)}</span> of{' '}
                                <span className="font-semibold text-green-600">{meta.total_count}</span> orders
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    aria-label="first"
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={currentPage === 1}
                                >
                                    <FaAngleDoubleLeft className="w-4 h-4" />
                                </button>
                                <button
                                    aria-label="prev"
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={currentPage === 1}
                                >
                                    <FaAngleLeft className="w-4 h-4" />
                                </button>

                                <div className="flex items-center gap-1">
                                    <span className=" font-semibold ">
                                        {currentPage}
                                    </span>
                                    /
                                    <span className="= text-gray-700 rounded-lg font-semibold">
                                        {meta.total_pages}
                                    </span>
                                </div>

                                <button
                                    aria-label="next"
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={currentPage === meta.total_pages}
                                >
                                    <FaAngleRight className="w-4 h-4" />
                                </button>
                                <button
                                    aria-label="last"
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={currentPage === meta.total_pages}
                                >
                                    <FaAngleDoubleRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                :
                <div className="flex flex-col gap-1">
                    <Image src="../../no-order.png" alt="no order" className="w-[200px] opacity-50 mx-auto" />
                    <p className="text-center text-gray-500 text-md">You don’t have any orders at the moment.</p>
                    <p className="text-center text-gray-500 text-sm">Your orders will appear here once you make a purchase.</p>
                </div>
            }

        </>
    )
}

export default TableAccountOrder