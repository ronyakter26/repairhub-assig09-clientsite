
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Search } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetchWithAuth("/api/admin/users");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load users.");
        }

        setUsers(result.users || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  async function handleRoleChange(userId: string, role: string) {
    try {
      setUpdatingId(userId);
      setError("");

      const response = await fetchWithAuth(
        `/api/admin/users/${userId}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update role.");
      }

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user._id === userId ? { ...user, role } : user
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Role update failed."
      );
    } finally {
      setUpdatingId("");
    }
  }

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#142D4E]">
              Manage Users
            </h1>
            <p className="mt-2 text-slate-500">
              View users and manage their roles.
            </p>
          </div>

          <Link
            href="/dashboard/admin"
            className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-center font-medium text-[#142D4E] transition hover:border-[#F59E0B]"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-[#142D4E]">
              All Users ({filteredUsers.length})
            </h2>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
              <Search size={18} className="text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full text-sm outline-none"
              />
            </div>
          </div>

          {loading ? (
            <p className="py-16 text-center text-slate-500">
              Loading users...
            </p>
          ) : error ? (
            <p className="py-16 text-center text-red-500">{error}</p>
          ) : filteredUsers.length === 0 ? (
            <div className="py-16 text-center">
              <Users size={35} className="mx-auto text-blue-500" />
              <h3 className="mt-4 font-bold text-[#142D4E]">
                No Users Found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                No registered users found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-600">
                    <th className="px-4 py-4 font-semibold">Name</th>
                    <th className="px-4 py-4 font-semibold">Email</th>
                    <th className="px-4 py-4 font-semibold">Phone</th>
                    <th className="px-4 py-4 font-semibold">Role</th>
                    <th className="px-4 py-4 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-slate-100 text-sm"
                    >
                      <td className="px-4 py-4 font-medium text-[#142D4E]">
                        {user.name}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {user.phone || "—"}
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-600">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={user.role}
                          disabled={updatingId === user._id}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#F59E0B] disabled:opacity-50"
                        >
                          <option value="customer">Customer</option>
                          <option value="technician">Technician</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
