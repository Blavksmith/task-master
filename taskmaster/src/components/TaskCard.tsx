import React from "react";
import { Badge } from "./ui/badge";

function TaskCard({ title }: { title: string }) {
  return (
    <div>
      <div className="flex flex-col bg-white rounded-lg shadow p-4">
        <div className="flex border-gray-200 p-4 justify-between items-center w-full">
          <h2 className="font-semibold text-gray-800">{title}</h2>
          <Badge className="bg-gray-200 hover:bg-gray-300 font-semibold text-gray-800 w-8 h-8">
            2
          </Badge>
        </div>

        <div className="p-4 space-y-8">
          {/* Task Card */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">
                Tugas Software Engineering
              </h3>
              <Badge className="bg-red-200 text-red-600 hover:bg-red-300 font-semibold">
                High
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">Kelarin AOL</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">Belajar buat Quiz</h3>
              <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-100">
                Medium
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">Materi dari sesi 1 - 6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
