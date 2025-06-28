import React from 'react';

export default function Pagination() {
    const pageNumbers = [1, 2, 3, 4]

    return (
        <nav className="flex justify-center items-center gap-2 mt-8">
            <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
            </button>
            <div className="flex space-x-1">
                {pageNumbers.map((pageNumber) => (
                    <button key={pageNumber} className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-100">
                        {pageNumber}
                    </button>
                ))}
            </div>
            <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
            </button>
        </nav>
    );
};
