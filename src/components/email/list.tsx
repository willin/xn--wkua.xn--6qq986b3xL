import { Emails, Status } from '@prisma/client';
import { useRouter } from 'next/router';
import clsx from 'classnames';

function ShowStatus({ status }: { status: Status }) {
  let statusClass = '';
  let statusText = '';
  switch (status) {
    case Status.ACTIVE: {
      statusClass = 'badge-success';
      statusText = '使用中';
      break;
    }
    case Status.BANNED: {
      statusClass = 'badge-warning';
      statusText = '已禁用';
      break;
    }
    case Status.DELETED: {
      statusClass = 'badge-error';
      statusText = '已删除';
      break;
    }
    default: {
      statusClass = 'badge-info';
      statusText = '待开通';
    }
  }
  return <div className={clsx('badge', statusClass)}>{statusText}</div>;
}

export function ShowEmails({ emails }: { emails: Emails[] }) {
  const router = useRouter();

  async function submitDelete(id: string) {
    const confirmed = confirm('确定要删除吗？');
    if (!confirmed) {
      return;
    }
    const res = await fetch(`/api/email/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'content-type': 'application/json'
      }
    });
    const result = (await res.json()) as { success: boolean; id: string };
    if (result.success) {
      alert('删除成功！');
      router.reload();
    } else {
      alert('出错啦！请稍后重试');
    }
  }

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full min-w-full'>
        <thead>
          <tr>
            <th>编号</th>
            <th>地址</th>
            <th>目标</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr className='hover' key={email.id}>
              <th>{email.no}</th>
              <td>{email.name}</td>
              <td>{email.content}</td>
              <td>
                <ShowStatus status={email.status} />
              </td>
              <td>
                <button
                  className='btn btn-error btn-xs'
                  onClick={submitDelete.bind(null, email.id)}>
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
