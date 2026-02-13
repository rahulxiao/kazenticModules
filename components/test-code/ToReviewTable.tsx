export default function ToReviewTable() {
    return (
        <div>
            <table className="w-full text-left border-collapse table-fixed">
                <thead className="bg-[#f2f9fe] text-[#191f38] text-[15px] font-bold border-b border-gray-200">
                    <tr>
                        <th>Details</th>
                        <th>Duration</th>
                        <th>Limit</th>
                        <th>Payable</th>
                        <th>Over Limit</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-200">
                        <td>
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="size-7 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                    R
                                </div>
                                <span className="text-[11px] font-medium text-[#191f38] truncate">
                                    Rahul Xiao
                                </span>
                            </div>
                        </td>
                        <td>Duration</td>
                        <td>Limit</td>
                        <td>Payable</td>
                        <td>Over Limit</td>
                        <td>Status</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}